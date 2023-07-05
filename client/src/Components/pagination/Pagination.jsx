import Style from "./Pagination.module.css";

export const Pagination = ({
  dogsCardsPerPage,
  allDogs,
  paginado,
  paginadoPrev,
  paginadoNext,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allDogs / dogsCardsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <div className={Style.paginationCenter}>
        <div className={Style.number} onClick={paginadoPrev}>
          «
        </div>
        {pageNumbers.map((number) => (
          <div
            className={currentPage === number ? Style.pageActual : Style.number}
            key={number}
            onClick={() => paginado(number)}
          >
            {number}
          </div>
        ))}
        <div className={Style.number} onClick={paginadoNext}>
          »
        </div>
      </div>
    </nav>
  );
};
