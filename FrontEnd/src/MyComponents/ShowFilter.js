import React, { useEffect, useState } from 'react'
function ShowFilter(){
    return(
        <button
				  className="btn btn-outline-secondary mb-3 w-100 d-lg-none"
				  type="button"
				  data-mdb-toggle="collapse"
				  data-mdb-target="#navbarSupportedContent"
				  aria-controls="navbarSupportedContent"
				  aria-expanded="false"
				  aria-label="Toggle navigation"
				  >
			<span>Show filter</span>
		  </button>
    )
}
export default ShowFilter