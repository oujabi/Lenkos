import React, {Component} from 'react';
import {getCookie} from "../factory/cookie";
import {getPost} from "../API/post";
import PostComponent from "../component/PostComponent";

class Article extends Component{
    constructor(props) {
        super(props);
        this.state = ({
            token: '',
            post:[],
        })
    }

    componentDidMount() {
        getCookie(this.stateToken);
    }

    stateToken = (data) => {
        getPost(data, this.statePost)
        this.setState({
            token: data,
        })
    }

    statePost = (data) =>{
        let tab =[];
        data.map(d => {
            /**Retire balises <p></p> de la chaine de caractère*/
            let content = d.content['rendered'].replace("<p>", '');
            content = content.replace("</p>", '');
            /** */
            tab.push(
                {
                    "id": d.id,
                    "author": d.author,
                    "categorie": d.categorie,
                    "content": content,
                    "date": d.date,
                    "status": d.status,
                    "title": d.title['rendered'],
                    "type": d.type,
                })
            return tab;
            }
        )
        this.setState({
            post: [...this.state.post, ...tab]
        })
    }

    handleLogOut = () => {
        window.location.pathname = "/";
    }

    handleClick = () => {
        window.location.pathname = '/portfolios'
    }

    render () {
        return (
            <div>
                <h2>Section Posts :</h2>
                <button onClick={this.handleLogOut}>log out</button>
                <div className="card-container">
                    {
                        this.state.post.map(m => <PostComponent key={m.id} {...m} /> )
                    }
                </div>
                <button onClick={this.handleClick}>Porfolios</button>
            </div>
        )
    }
}

export default Article;