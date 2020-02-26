import React from "react";
import Axois from "axios";
export default function cards(props) {
  let style = {
    height: "50px",
    overflow: "hidden",
    textoverflow: "ellipsis",
  };
  const onclickDelete = async (content, id) => {
    const url = `/${content}/delete/${id}`;
    const { token } = JSON.parse(sessionStorage.getItem("userData"));
    const Authorization = `Bearer ${token}`;
    try {
      await Axois.delete(url, {
        headers: {
          Authorization,
        },
      });
      window.location.reload();
      alert("sucessfully deleted");
    } catch (error) {
      console.log(error);
    }
  };

  if (props.content === "Blog") {
    return (
      <div className='card bg-light'>
        <div className='card-body'>
          <h4 className='card-title'>{props.title}</h4>
          <hr />
          <p className='card-text'>{props.head}</p>

          <div className='float-right'>
            <button
              className='card-link btn btn-danger'
              onClick={() => onclickDelete("Blog", props.id)}>
              Delete
            </button>

            <a
              href={"/BlogUpdate/" + props.id}
              className='card-link btn btn-info '>
              Update
            </a>
            <a
              href={"/Blog/" + props.id}
              className='card-link btn btn-warning '>
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  } else if (props.content === "Article") {
    return (
      <div className='card bg-light'>
        <div className='card-body'>
          <h4 className='card-title'>{props.title}</h4>
          <hr />
          <p className='card-text'>{props.head}</p>
          <div className='float-right'>
            <button
              className='card-link btn btn-danger '
              onClick={() => onclickDelete("article", props.id)}>
              Delete
            </button>
            <a
              href={"/ArticleUpdate/" + props.id}
              className='card-link btn btn-info '>
              Update
            </a>
            <a
              href={"/Article/" + props.id}
              className='card-link btn btn-warning '>
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  } else if (props.content === "Essay") {
    return (
      <div className='card bg-light'>
        <div className='card-body'>
          <h4 className='card-title'>{props.title}</h4>
          <hr />
          <p className='card-text' style={style}>
            {props.head}
          </p>
          <div className='float-right'>
            <button
              className='card-link btn btn-danger '
              onClick={() => onclickDelete("Essay", props.id)}>
              Delete
            </button>

            <a
              href={"/EssayUpdate/" + props.id}
              className='card-link btn btn-info '>
              Update
            </a>
            <a
              href={"/Essay/" + props.id}
              className='card-link btn btn-warning '>
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}
