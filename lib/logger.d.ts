import { ILogger } from "../types/logger";
declare class Logger implements ILogger {
    private readonly _NOW;
    private readonly _TITLE;
    private readonly _LEVEL;
    private readonly _COLOR;
    constructor();
    info(text: string): void;
    warn(text: string): void;
    error(text: string): void;
}
declare const _default: Logger;
export default _default;
//# sourceMappingURL=logger.d.ts.map