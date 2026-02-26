/**
 * MedKitt Consult Tree Types
 * Type definitions for decision tree-based clinical consults with references
 */

/**
 * Reference/Citation for clinical guidelines
 */
export interface Reference {
  /** Unique identifier for the reference (e.g., 1, 2, 3) */
  id: number;
  /** Full title of the guideline or publication */
  title: string;
  /** Authors or authoring organization */
  authors?: string;
  /** Journal, organization, or source (e.g., "CDC", "ESC", "NEJM") */
  source: string;
  /** Publication year */
  year: number;
  /** Direct URL to the source */
  url?: string;
  /** Date accessed (for web resources) */
  accessedDate?: string;
  /** Volume and issue for journal articles */
  volume?: string;
  /** Page numbers */
  pages?: string;
  /** DOI if available */
  doi?: string;
  /** Short citation for display */
  shortCitation?: string;
}

/**
 * A single node in the decision tree
 */
export interface TreeNode {
  /** Unique identifier for the node */
  id: string;
  /** Node title/heading */
  title: string;
  /** Content with optional reference markers {{ref:N}} */
  content: string;
  /** Array of child nodes for branching decisions */
  children?: TreeNode[];
  /** Reference IDs associated with this node */
  references?: number[];
  /** Node type determines styling and behavior */
  type?: 'info' | 'decision' | 'warning' | 'success' | 'treatment' | 'diagnostic';
  /** Optional metadata for the node */
  metadata?: {
    /** Tags for categorization */
    tags?: string[];
    /** Priority level */
    priority?: 'low' | 'medium' | 'high' | 'critical';
    /** Associated ICD-10 codes */
    icd10?: string[];
  };
}

/**
 * Complete consult tree structure
 */
export interface ConsultTree {
  /** Unique identifier for the consult */
  id: string;
  /** Consult title */
  title: string;
  /** Brief description of the consult */
  description: string;
  /** Medical specialty or category */
  category: string;
  /** Version of the consult guidelines */
  version: string;
  /** Last updated date (ISO format) */
  lastUpdated: string;
  /** Root node of the decision tree */
  root: TreeNode;
  /** Array of all references used in this consult */
  references: Reference[];
  /** Metadata about the consult */
  metadata?: {
    /** Authoring physician or organization */
    author?: string;
    /** Review status */
    reviewStatus?: 'draft' | 'reviewed' | 'approved';
    /** Target audience */
    audience?: string[];
    /** Estimated time to complete (minutes) */
    estimatedTime?: number;
  };
}

/**
 * Parsed content segment - either plain text or a reference
 */
export interface ContentSegment {
  type: 'text' | 'reference';
  content: string;
  refId?: number;
}

/**
 * Reference link state for UI
 */
export interface ReferenceLinkState {
  /** Whether the reference is expanded */
  expanded: boolean;
  /** Currently hovered reference */
  hoveredRefId: number | null;
}
