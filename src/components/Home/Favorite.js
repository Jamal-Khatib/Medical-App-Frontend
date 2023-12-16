import { useEffect, useState } from "react";
import Post from "./Post";

const Favorite = ({userId}) =>{

    const[favorites, setFavorites] = useState([]);

    useEffect( ()=>{

        async function getFavorites(){
            let req = await fetch(`http://localhost:8080/favorite/${userId}`) ; 
            if(req.status!=200)  ; 
            let res = await req.json() ; 
            let updated = res.map((r) => ({ ...r, favorite: true }));
            setFavorites(updated) ; 
            console.log(res) ; 
        }

        getFavorites() ;

    
    },[])
    return (
        <>
            {
                favorites.map((post) => (
                    <Post
                        key={post.id}
                        id={post.id}
                        title={post.title}
                        body={post.body}
                        user={post.user}
                        date={post.date}
                        type={post.type}
                        favorite={post.favorite}
                        currentUserId={userId}
                    />
                ))
            }
        </>
    );
}

export default Favorite ; 