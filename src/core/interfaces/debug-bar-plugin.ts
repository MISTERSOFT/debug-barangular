export interface IDebugBarPlugin {
  /**
   * Title of the plugin.
   * This is for the tab.
   */
  name: string;

  /**
   * Icon of the plugin.
   * Here, Material Design Icons is used.
   * See: https://materialdesignicons.com/
   */
  icon: string;

  /**
   * Data that you want pass to your debug bar plugin component.
   */
  data: any;
}
