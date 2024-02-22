declare const _default: () => {
    database: {
        host: string;
        port: string | number;
        username: string;
        password: string;
        database: string;
    };
    jwt: {
        secret: string;
        ttl: string;
    };
};
export default _default;
