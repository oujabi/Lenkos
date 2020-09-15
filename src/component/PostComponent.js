import React, {Component} from "react";

class PostComponent extends Component {

    render () {
        const {author, status, title, content, date, type} = this.props
        return (
            <div className="card-post">
                <div className={"card-header"}>
                    <em>Author: {author}</em>
                    <em>status: {status}</em>
                </div>
                <div className={"card-body"}>
                    <h2>{title}</h2>
                    {content}
                </div>
                <div className="card-footer">
                    <p>date : {date}</p>
                    <p>type: {type}</p>
                </div>
            </div>
        )
    }
}

export default PostComponent;