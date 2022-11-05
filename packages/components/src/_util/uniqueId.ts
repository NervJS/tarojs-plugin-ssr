const { uniqueId } = new class {
    count = 0

    uniqueId = () => {
        return this.count++
    }
}

export default uniqueId
