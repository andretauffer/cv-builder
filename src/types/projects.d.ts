/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type TheProjectSDescription = string;

/**
 * This projects section describes live projects and has links to those.
 */
export interface Projects {
  /**
   * A title for the section.
   */
  title?: string;
  /**
   * Array of projects to be displayed. If the array has zero items, nothing will be displayed.
   */
  projects?: {
    /**
     * Project's title
     */
    title?: string;
    description?: TheProjectSDescription;
    /**
     * Link to a representation of the project.
     */
    url: string;
    /**
     * Image to be represent project.
     */
    image?: string;
    useOGTags?: boolean;
    [k: string]: unknown;
  }[];
  [k: string]: unknown;
}