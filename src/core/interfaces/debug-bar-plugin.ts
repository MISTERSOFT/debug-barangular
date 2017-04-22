export interface IDebugBarPlugin {
  /**
   * Title of the plugin.
   * This is for the tab.
   */
  name: string;

  /**
   * Data that you want pass to your debug bar plugin component.
   */
  data: any;
}
