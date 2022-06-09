import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../store/auth-context";

const Tablehook = (
  tablename,
  searchterm,
  parameters,
  searchby,
  globalsearch,
  opplink=""
) => {
  let a=opplink
  const [data, setData] = useState([]);
  const [order, setOrder] = useState("");
  const [loading, setLoading] = useState(true);
  const [paginations, setPagination] = useState({});
  const [pagenumber, setPagenumber] = useState(1);
  const [show, setShow] = useState(true);
  const [reset, setreset] = useState(false);
  const [sortby, setsortby] = useState("");
  const [itemperpage, setitemperpage] = useState(5);
  let searchlink = searchterm == "" ? "" : "&" + searchby + "=";
  const global = globalsearch == "" ? "" : "&search=" + globalsearch;
  const sortlink = sortby == "" ? "" : "&order%5B" + sortby + "%5D=" + order;
  const leaf = (obj, path) =>
    path.split(".").reduce((value, el) => value[el], obj);
  const itemperpageHandler = (e) => {
    setitemperpage(e.target.value);
  };
  const sortHandler = (v) => {
    setsortby(v);
    console.log(v);
    if (order === "asc" || order === "") {
      setOrder("desc");
    }
    if (order === "desc") {
      setOrder("asc");
    }
  };
  const authctx = useContext(AuthContext);
  useEffect(() => {
    console.log(tablename,a.length==0,"aaa")
    if(tablename=="opportunity" && a.length==0){
      return{data:[]};
    }
    const link = opplink.length==0?
      "http://localhost:8000/api/" +
      tablename +
      "?page=" +
      pagenumber +
      "&itemsPerPage=" +
      itemperpage +
      (tablename=="users"&&"&anonymized=false") +
      global +
      searchlink +
      searchterm +
      sortlink:opplink
      console.log(link)
    axios
      .get(link, { headers: { Authorization: "Bearer " + authctx.token } })
      .then((response) => {
        console.log("zzzzzzzzz")
        console.log(response.data["hydra:member"]);
        const table = response.data["hydra:member"].map((d) => {
          var a = parameters.map((p) => {
            if(p==="revenueLocalPart" || p==="revenueHQPart"){
              return { [p]: leaf(d, p) };
            }
            else if (
              Object.prototype.toString.call(leaf(d, p.split(".")[0])) ===
              "[object Array]"
            ) {
              return {
                [p]: leaf(d, p.split(".")[0]).map((l) => {
                  if (p.split(".").length == 1) {
                    return l + ",";
                  }
                  return l[p.split(".")[1]] + ",";
                }),
              };
            } else {
              return { [p]: leaf(d, p) };
            }
          });
          return Object.assign({}, ...a);   
        });
        console.log(table);
        if (response.data["hydra:totalItems"] > 2) {
          setPagination({
            number: response.data["hydra:totalItems"],
            current: response.data["hydra:view"]["@id"],
            first: response.data["hydra:view"]["hydra:first"],
            last: response.data["hydra:view"]["hydra:last"],
            next: response.data["hydra:view"]["hydra:next"],
            previous: response.data["hydra:view"]["hydra:previous"],
          });

          setShow(true);
        } else if (response.data["hydra:totalItems"] === 0) {
          setShow(false);
          if(opplink.length>0){setPagination({
            number: 0,
          })}
        } else {
          setPagination({
            number: response.data["hydra:totalItems"],
          });
          setShow(true);
        }
        if (
          (searchterm.trim() !== "" || itemperpage > paginations.number) &&
          !reset
        ) {
          f();
          setreset(true);
        } else if (searchterm.trim() == "" && reset) {
          setreset(false);
        }

        setData(table);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [
    loading,
    pagenumber,
    searchterm,
    order,
    itemperpage,
    global,
    authctx.token,
    opplink,
  ]);

  const loadingchange = () => {
    setLoading(true);
    setPagenumber(1);
  };
  var i;
  const handleChange = (event, v) => {
    setPagenumber(v);
    i = pagenumber;
  };
  const f = (v = 1) => {
    setPagenumber(v);
  };
  
  return {
    data,
    loading,
    paginations,
    show,
    pagenumber,
    reset,
    itemperpage,
    loadingchange,
    sortHandler,
    handleChange,
    itemperpageHandler,
  };
};
export default Tablehook;