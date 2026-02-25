// MedKitt — Tree Engine
// Manages tree traversal: start, navigate, go back, record answers, save/restore.

import type { DecisionNode, TreeSession } from '../models/types.js';
import { storageGet, storageSet, storageRemove } from './storage.js';

const SESSION_KEY = 'em-tree-session';

export class TreeEngine {
  private nodes: Map<string, DecisionNode>;
  private session: TreeSession | null = null;

  constructor(nodes: DecisionNode[]) {
    this.nodes = new Map();
    for (const node of nodes) {
      this.nodes.set(node.id, node);
    }
  }

  /** Start a new tree session from the entry node */
  startTree(treeId: string, entryNodeId: string): DecisionNode {
    const entryNode = this.nodes.get(entryNodeId);
    if (!entryNode) {
      throw new Error(`Entry node not found: ${entryNodeId}`);
    }

    this.session = {
      treeId,
      currentNodeId: entryNodeId,
      history: [],
      answers: {},
      startedAt: Date.now(),
    };

    this.saveSession();
    return entryNode;
  }

  /** Get the current node */
  getCurrentNode(): DecisionNode | null {
    if (!this.session) return null;
    return this.nodes.get(this.session.currentNodeId) ?? null;
  }

  /** Get the current session */
  getSession(): TreeSession | null {
    return this.session;
  }

  /** Navigate to a node by selecting an option.
   *  Records the answer and pushes current node to history. */
  selectOption(optionIndex: number): DecisionNode | null {
    if (!this.session) return null;

    const currentNode = this.nodes.get(this.session.currentNodeId);
    if (!currentNode?.options || optionIndex >= currentNode.options.length) {
      return null;
    }

    const option = currentNode.options[optionIndex];

    // Record the answer (option label keyed by node ID)
    this.session.answers[currentNode.id] = option.label;

    // Push current to history for back navigation
    this.session.history.push(this.session.currentNodeId);

    // Navigate to next node
    this.session.currentNodeId = option.next;

    this.saveSession();
    return this.nodes.get(option.next) ?? null;
  }

  /** Navigate forward via the default `next` pointer (for info nodes) */
  continueToNext(): DecisionNode | null {
    if (!this.session) return null;

    const currentNode = this.nodes.get(this.session.currentNodeId);
    if (!currentNode?.next) return null;

    // Push current to history
    this.session.history.push(this.session.currentNodeId);

    // Navigate
    this.session.currentNodeId = currentNode.next;

    this.saveSession();
    return this.nodes.get(currentNode.next) ?? null;
  }

  /** Go back one step in the history */
  goBack(): DecisionNode | null {
    if (!this.session || this.session.history.length === 0) return null;

    const previousId = this.session.history.pop()!;

    // Remove the answer for the node we're leaving
    delete this.session.answers[this.session.currentNodeId];

    this.session.currentNodeId = previousId;

    this.saveSession();
    return this.nodes.get(previousId) ?? null;
  }

  /** Check if we can go back */
  canGoBack(): boolean {
    return this.session !== null && this.session.history.length > 0;
  }

  /** Get a node by ID (for lookups) */
  getNode(id: string): DecisionNode | null {
    return this.nodes.get(id) ?? null;
  }

  /** Get the module number of the current node */
  getCurrentModule(): number | null {
    const node = this.getCurrentNode();
    return node?.module ?? null;
  }

  /** Get how many modules the tree has (max module number) */
  getTotalModules(): number {
    let max = 0;
    for (const node of this.nodes.values()) {
      if (node.module > max) max = node.module;
    }
    return max;
  }

  /** Jump back to a specific point in the history.
   *  Truncates history to the given index and removes answers after that point. */
  jumpToHistory(index: number): DecisionNode | null {
    if (!this.session || index < 0 || index >= this.session.history.length) return null;

    const targetId = this.session.history[index];

    // Remove answers for nodes after the target
    const removedIds = this.session.history.slice(index);
    for (const id of removedIds) {
      delete this.session.answers[id];
    }
    // Also remove answer for current node (we're leaving it)
    delete this.session.answers[this.session.currentNodeId];

    // Truncate history to just before the target
    this.session.history = this.session.history.slice(0, index);

    // Set current node to the target
    this.session.currentNodeId = targetId;

    this.saveSession();
    return this.nodes.get(targetId) ?? null;
  }

  /** Jump back to the entry node, clearing all history and answers but keeping session alive */
  goToEntry(entryNodeId: string): DecisionNode | null {
    if (!this.session) return null;

    this.session.history = [];
    this.session.answers = {};
    this.session.currentNodeId = entryNodeId;

    this.saveSession();
    return this.nodes.get(entryNodeId) ?? null;
  }

  /** Jump directly to any node in the tree (e.g., from a summary page).
   *  Clears history and answers — treats the target as a fresh starting point. */
  jumpToNode(nodeId: string): DecisionNode | null {
    if (!this.session) return null;
    const node = this.nodes.get(nodeId);
    if (!node) return null;
    this.session.history = [];
    this.session.answers = {};
    this.session.currentNodeId = nodeId;
    this.saveSession();
    return node;
  }

  /** Reset the session — start over */
  reset(): void {
    this.session = null;
    storageRemove(SESSION_KEY);
  }

  /** Save the current session to LocalStorage */
  private saveSession(): void {
    if (this.session) {
      storageSet(SESSION_KEY, this.session);
    }
  }

  /** Restore a saved session from LocalStorage.
   *  Returns the current node if session exists and is valid, null otherwise. */
  restoreSession(treeId: string): DecisionNode | null {
    const saved = storageGet<TreeSession | null>(SESSION_KEY, null);
    if (!saved || saved.treeId !== treeId) return null;

    // Verify the current node still exists
    if (!this.nodes.has(saved.currentNodeId)) {
      storageRemove(SESSION_KEY);
      return null;
    }

    this.session = saved;
    return this.nodes.get(saved.currentNodeId) ?? null;
  }

  /** Get the answer history as an array of {nodeId, answer} for display */
  getAnswerHistory(): { nodeId: string; nodeTitle: string; answer: string }[] {
    if (!this.session) return [];

    const result: { nodeId: string; nodeTitle: string; answer: string }[] = [];
    for (const nodeId of this.session.history) {
      const answer = this.session.answers[nodeId];
      const node = this.nodes.get(nodeId);
      if (answer !== undefined && node) {
        result.push({
          nodeId,
          nodeTitle: node.title,
          answer: String(answer),
        });
      }
    }
    return result;
  }
}
