import { MdOutlineShortText } from "react-icons/md";

function Search({search, setSearch}) {
    return (
      /* Input */
      <div className="max-w-[1150px] bg-[#23263d] rounded-2xl overflow-hidden p-0.5 px-5 pr-4 flex items-center">
        <div className="h-3 w-3 rounded-2xl border-[0px] flex-shrink-0 animate-bounce"/>
        <input className="bg-[#23263d] text-white border-none lg:w-full focus:ring-0 outline-none placeholder-[#fafafa] text-xs" type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar..." />

      {/* Tags */}
        <div className="flex items-center divide-x-3 divide-[#333333] ml-auto">
          <div className="flex space-x-1.5 pr-4">
            <button className="tag">House</button>
            <button className="tag">Rock</button>
            <button className="tag">Rap</button>
          </div>
        </div>

      {/* Filtro */}
        <div className="flex items-center space-x-1.8 text-[#cecece] pl-4">
          <MdOutlineShortText className="text-2xl" />
          <span className="text-sm">Filtrar</span>
        </div>

      </div>
    )
  }
  
  export default Search;