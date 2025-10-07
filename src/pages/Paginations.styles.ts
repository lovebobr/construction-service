<PaginationWrapper>
  <PageButton
    disabled={currentPage === 1}
    onClick={() => setCurrentPage((p) => p - 1)}
  >
    <ArrowLeft size={18} />
  </PageButton>
  <PageInfo>
    {currentPage} / {totalPages}
  </PageInfo>
  <PageButton
    disabled={currentPage >= totalPages}
    onClick={() => setCurrentPage((p) => p + 1)}
  >
    <ArrowRight size={18} />
  </PageButton>
</PaginationWrapper>;
