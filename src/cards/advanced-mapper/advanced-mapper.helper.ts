import {Function} from "eval5";

export class AdvancedMapperHelper {
    async execute(code: string, payload: any) {
        const mapper = Function('req', 'res', code);
        return mapper(payload, <any>{});
    }
}