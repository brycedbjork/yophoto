declare module "rpi-gpio" {
  export default {
    setup: (pin: number, mode: string, callback: () => void) => {},
    DIR_OUT: string,
    DIR_IN: string,
    EDGE_BOTH: string,
    read: (pin: number, callback: (err: any, value: any) => void) => {},
    on: any
  };
}
