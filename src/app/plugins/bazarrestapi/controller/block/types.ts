export interface Block<T = Buffer | string> {
    header: {
        [key: string]: unknown;
        id?: T;
        version: number;
        asset: Record<string, unknown>;
    };
    payload: {
        [key: string]: unknown;
        id?: T;
    }[];
}
