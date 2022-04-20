import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Text, View } from "react-native";
import { logUserOut } from "../apollo";
import AuthButton from "../components/auth/AuthButton";

const ME_QUERY = gql`
  query me {
    me {
      username
      email
      name
    }
  }
`;

export default function Profile() {
  const { data } = useQuery(ME_QUERY);
  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "white" }}>Profile</Text>
      <View style={{ marginVertical: 10 }}>
        <Text style={{ color: "white" }}>Username: {data?.me.username}</Text>
        <Text style={{ color: "white" }}>Email: {data?.me.email}</Text>
        <Text style={{ color: "white" }}>Name: {data?.me.name}</Text>
      </View>
      <AuthButton text="Logout" disabled={false} onPress={logUserOut} />
    </View>
  );
}
