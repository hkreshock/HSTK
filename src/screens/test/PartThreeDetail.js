import { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import hstkFetch from '../../hstkFetch';

const Item = ({ email, body, removeComment }) => (
    <View style={{ display: 'flex', flexDirection: 'row', borderBottomColor: 'black', borderBottomWidth: 1, justifyContent: 'space-between' }}>
        <View style={{ display: 'flex', flexDirection: 'column', maxWidth: '80%' }}>
            <Text>{email}</Text>
            <Text>{body}</Text>
        </View>
        <TouchableOpacity onPress={removeComment}>
            <Image style={{ width: 35, height: 35, marginTop: 5 }} source={require('../../../assets/icon.png')}></Image>
        </TouchableOpacity>
    </View>
);

export default function({ id }) {
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        if (id) {
            hstkFetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then((response) => {
                return response.json();
              }).then((data) => {
                setPost(data)
            })
            hstkFetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`).then((response) => {
                return response.json();
              }).then((data) => {
                setComments(data)
            })
        }

        return;
    }, [id]);
    const removeComment = (index) => {
        const newComments = comments.filter((itm, i) => i !== index);
        setComments(newComments);
    }

    return id ?
    <View>
        <Text style={{ borderBottomColor: 'black', borderBottomWidth: 1 }}>{post?.title}</Text>
        <Text>{post?.body}</Text>
        <Text style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginTop: 50 }}>Comments:</Text>
        <FlatList
          data={comments}
          renderItem={({item, index}) => <Item removeComment={() => removeComment(index)} email={item.email} body={item.body} />}
          keyExtractor={item => item.email}
        />
    </View>
    : null;
}