import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

interface Props {
  totalPages: number;
}
export const Pagination = ({ totalPages }: Props) => {
  return (
    <div className="mb-10 flex justify-center">
      <nav aria-label="Page navigation example">
        <ul className="flex list-style-none">
          <li className="page-item ">
            <a
              className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href="#"
              aria-disabled="true"
            >
              <IoChevronBackOutline size={30}></IoChevronBackOutline>
            </a>
          </li>
          <li className="page-item">
            <a
              className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href="#"
            >
              1
            </a>
          </li>
          <li className="page-item active">
            <a
              className="page-link relative block py-1.5 px-3 rounded border-0 bg-blue-600 outline-none transition-all duration-300 rounded text-white hover:text-white hover:bg-blue-600 shadow-md focus:shadow-md"
              href="#"
            >
              2 <span className="visually-hidden"></span>
            </a>
          </li>
          <li className="page-item">
            <a
              className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href="#"
            >
              3
            </a>
          </li>
          <li className="page-item">
            <a
              className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href="#"
            >
              <IoChevronForwardOutline size={30} />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
