import { Link } from "react-router-dom"

export const Pagination = ( {elementsPerPage, totalElements, paginate, theme} ) => {
    const pageNumbers = []
    for (let i = 1; i<= Math.ceil(totalElements/elementsPerPage); i++){
        pageNumbers.push(i)
    }
    return <ul className="page-list">
            {
                [pageNumbers.map(number => (
                    <Link className={`page-item-link`} onClick={()=>paginate(number)}>
                        <li key={number} className={`page-item`}>
                            {number}
                        </li>
                    </Link>
                ))]
            }
    </ul>
}