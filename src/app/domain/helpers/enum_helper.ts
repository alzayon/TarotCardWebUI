export class EnumHelper {
    static toList<T>(enumToLoop: T): Array<any> {
        // https://stackoverflow.com/questions/39372804/typescript-how-to-loop-through-enum-values-for-display-in-radio-buttons
        const list = Object.keys(enumToLoop).filter(key => !isNaN(Number(enumToLoop[key])));
        return list;
    }
}