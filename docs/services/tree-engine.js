import { storageGet, storageSet, storageRemove } from "./storage.js";
const SESSION_KEY = "em-tree-session";

export class TreeEngine {
  nodes;
  session = null;
  constructor(nodes) {
    this.nodes = new Map;
    for (const node of nodes) {
      this.nodes.set(node.id, node);
    }
  }
  startTree(treeId, entryNodeId) {
    const entryNode = this.nodes.get(entryNodeId);
    if (!entryNode) {
      throw new Error(`Entry node not found: ${entryNodeId}`);
    }
    this.session = {
      treeId,
      currentNodeId: entryNodeId,
      history: [],
      answers: {},
      startedAt: Date.now()
    };
    this.saveSession();
    return entryNode;
  }
  getCurrentNode() {
    if (!this.session)
      return null;
    return this.nodes.get(this.session.currentNodeId) ?? null;
  }
  getSession() {
    return this.session;
  }
  selectOption(optionIndex) {
    if (!this.session)
      return null;
    const currentNode = this.nodes.get(this.session.currentNodeId);
    if (!currentNode?.options || optionIndex >= currentNode.options.length) {
      return null;
    }
    const option = currentNode.options[optionIndex];
    this.session.answers[currentNode.id] = option.label;
    this.session.history.push(this.session.currentNodeId);
    this.session.currentNodeId = option.next;
    this.saveSession();
    return this.nodes.get(option.next) ?? null;
  }
  continueToNext() {
    if (!this.session)
      return null;
    const currentNode = this.nodes.get(this.session.currentNodeId);
    if (!currentNode?.next)
      return null;
    this.session.history.push(this.session.currentNodeId);
    this.session.currentNodeId = currentNode.next;
    this.saveSession();
    return this.nodes.get(currentNode.next) ?? null;
  }
  goBack() {
    if (!this.session || this.session.history.length === 0)
      return null;
    const previousId = this.session.history.pop();
    delete this.session.answers[this.session.currentNodeId];
    this.session.currentNodeId = previousId;
    this.saveSession();
    return this.nodes.get(previousId) ?? null;
  }
  canGoBack() {
    return this.session !== null && this.session.history.length > 0;
  }
  getNode(id) {
    return this.nodes.get(id) ?? null;
  }
  getCurrentModule() {
    const node = this.getCurrentNode();
    return node?.module ?? null;
  }
  getTotalModules() {
    let max = 0;
    for (const node of this.nodes.values()) {
      if (node.module > max)
        max = node.module;
    }
    return max;
  }
  jumpToHistory(index) {
    if (!this.session || index < 0 || index >= this.session.history.length)
      return null;
    const targetId = this.session.history[index];
    const removedIds = this.session.history.slice(index);
    for (const id of removedIds) {
      delete this.session.answers[id];
    }
    delete this.session.answers[this.session.currentNodeId];
    this.session.history = this.session.history.slice(0, index);
    this.session.currentNodeId = targetId;
    this.saveSession();
    return this.nodes.get(targetId) ?? null;
  }
  goToEntry(entryNodeId) {
    if (!this.session)
      return null;
    this.session.history = [];
    this.session.answers = {};
    this.session.currentNodeId = entryNodeId;
    this.saveSession();
    return this.nodes.get(entryNodeId) ?? null;
  }
  reset() {
    this.session = null;
    storageRemove(SESSION_KEY);
  }
  saveSession() {
    if (this.session) {
      storageSet(SESSION_KEY, this.session);
    }
  }
  restoreSession(treeId) {
    const saved = storageGet(SESSION_KEY, null);
    if (!saved || saved.treeId !== treeId)
      return null;
    if (!this.nodes.has(saved.currentNodeId)) {
      storageRemove(SESSION_KEY);
      return null;
    }
    this.session = saved;
    return this.nodes.get(saved.currentNodeId) ?? null;
  }
  getAnswerHistory() {
    if (!this.session)
      return [];
    const result = [];
    for (const nodeId of this.session.history) {
      const answer = this.session.answers[nodeId];
      const node = this.nodes.get(nodeId);
      if (answer !== undefined && node) {
        result.push({
          nodeId,
          nodeTitle: node.title,
          answer: String(answer)
        });
      }
    }
    return result;
  }
}
