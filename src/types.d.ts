declare module "rpi-gpio" {
  export default {
    setup: (pin: number, mode: string, callback: () => void) => {},
    DIR_OUT: string,
    DIR_IN: string,
    EDGE_BOTH: string,
    on: any
  };
}
