module.exports = class Pageable {
    constructor(content, page, size, totalElements, totalPages) {
        this.content = content;
        this.page = page;
        this.size = size;
        this.totalElements = totalElements;
    }
}