let textArea =  document.getElementById('contentsBox');
let tweetList = []
let id =0;  // must define the id outside.

// count the letter at TextArea
let countLetter = () =>{
   let remain = 140 - textArea.value.length;

   if(remain<0){
    document.getElementById('charCountArea').innerHTML = `${remain}chars`.fontcolor("red");
   }else {
    document.getElementById('charCountArea').innerHTML = `${remain}chars`;
   }
}

// add event on textarea, should come after define the countLetter function. 
textArea.addEventListener('input',countLetter);



//  /// embedding approach (Bitna way, parents have children )
// let addTweet=() => {
//     let tweet = {
//         id:id,
//         contents: textArea.value,
//         retweets:[]
//     }
//     tweetList.push(tweet);

//     console.log("tweet Item",tweetList);
//     render(tweetList);
//     id++;
//     console.log("id increase to",id);
// }



// add the Tweet,  (Khoa way)
 let addTweet=() => {
    let tweet = {
        id:id, // unique value 
        contents: textArea.value
    }
    tweetList.push(tweet);

    
    render(tweetList);
    id++;

}


// Bitna Way to retweet 
// let retweet =(originid) =>{
//     // 1. find the tweet that you want to retweet
//     let originTweet = tweetList.find((item)=> item.id == originid)

//     // 2. make the retweet object and it will have same contents with original tweet 
//     let retweetObject = {
//         id:id,
//         contents: originTweet.contents,
//         retweets:[]
//     }

//     //3. push retweet object into tweetList
//     tweetList.push(retweetObject);

//     //4. add the retweet information to origin tweet. 
//     originTweet.retweets.push(id);
//     console.log("after retweet, tweetList will be,",tweetList);

//     //5.after everything done, make sure increase the id 
//     id++

//     //6. render tweetList 
//     render(tweetList)  
// }


// retweet function (Khoa way)
let retweet =(originid) =>{

    // 1. find the tweet that you want to retweet
    let originTweet = tweetList.find((item)=> item.id == originid)

    // 2. make the retweet object and it will have same contents with original tweet and parents id 
    let retweetObject = {
        id:id,
        contents: originTweet.contents,
        originTweetID:originid  // referencing
    }

    //3. push retweet object into tweetList
    tweetList.push(retweetObject);

    //5.after everything done, make sure increase the id 
    id++
    
    //6. render tweetList 
    render(tweetList)
    console.log(tweetList);
}



//Bitna way to delete 
// let deleteTweet = (deleteId) =>{
//     // 0. find the tweet that you want to delete 
//     let deleteTweetObject = tweetList.find((item)=>item.id == deleteId);

//     // 1. if the tweet that you want to delete has the retweet? then delete the retweet and original tweet
//     if(deleteTweetObject.retweets !=null){
//         tweetList = tweetList.filter((item)=> !deleteTweetObject.retweets.includes(item.id))
//     }

//     // 2. if the tweet doesnt have any retweet, than delete itself 
//      tweetList = tweetList.filter((item)=>item.id != deleteId);
//     // 3. show again. 
//     render(tweetList);
// }



//delete TWeet 
let deleteTweet = (deleteId) =>{
    // 1. remove original tweeter id and retweet id 
    tweetList = tweetList.filter(e=> e.id !== deleteId && e.originTweetID !== deleteId )
    
    // 2. show again. 
    render(tweetList);

}



// Show on screen 
let render= (array) =>{
    let htmlForTweet = array.map((item)=>`<li>${item.contents} <button>like</button><button onclick="retweet(${item.id})">retweet</button><button onclick="deleteTweet(${item.id})">delete</button></li>`).join('')
    document.getElementById('tweetArea').innerHTML= htmlForTweet

}

