import axios from "axios";
import { useEffect, useState } from "react";
import usePevState from "./hooks/usePevState";
export default function App() {
  const [term, setTerm] = useState("React");
  const [result, setResult] = useState([]);

  const prevTerm = usePevState(term);

  useEffect(() => {
    const search = async () => {
      const respond = await axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          list: "search",
          origin: "*",
          format: "json",
          srsearch: term,
        },
      });
      setResult(respond.data.query.search);
    };

    if (!result.length) {
      if (term) {
        search();
      }
    } else if (prevTerm !== term) {
      const debounsSearch = setTimeout(() => {
        if (term) {
          search();
        }
      }, 1500);
      return () => {
        clearTimeout(debounsSearch);
      };
    }
  }, [term, result.length, prevTerm]);

  const fetchResult = result.map((el) => {
    return (
      <tr key={el.pageid}>
        <td>1</td>
        <td>{el.title}</td>
        <td>
          <span dangerouslySetInnerHTML={{ __html: el.snippet }} />
        </td>
      </tr>
    );
  });
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="my-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Search Input
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              onChange={(e) => setTerm(e.target.value)}
              value={term}
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Desc</th>
              </tr>
            </thead>
            <tbody>{fetchResult}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
