export class Pageable<T> {
    constructor(
        public content: T[],
        public page: number,
        public size: number,
        public totalElements: number
    ) {}
}
