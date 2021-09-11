export const emptyContentFilter = {
  filters: {
    emptyContent (content) {
      return (content === 'N/A' ? '還沒有資料 :-(' : content)
    }
  }
}
