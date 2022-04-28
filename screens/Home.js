import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useState } from "react";
import { FlatList } from "react-native";
import Shop from "../components/Shop";
import ScreenLayout from "../components/ScreenLayout";

const COFFEESHOPS_QUERY = gql`
  query seeCoffeeShops($offset: Int!) {
    seeCoffeeShops(offset: $offset) {
      id
      name
      latitude
      longitude
      user {
        username
        avatarURL
      }
      categories {
        id
        name
      }
    }
  }
`;

export default function Home() {
  const { data, loading, refetch, fetchMore } = useQuery(COFFEESHOPS_QUERY, {
    variables: {
      offset: 0,
    },
  });
  const renderShop = ({ item: shop }) => {
    return <Shop {...shop} />;
  };
  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  const [refreshing, setRefreshing] = useState(false);
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        onEndReachedThreshold={0.02}
        onEndReached={() =>
          fetchMore({
            variables: {
              offset: data?.seeCoffeeShops?.length,
            },
          })
        }
        refreshing={refreshing}
        onRefresh={refresh}
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
        data={data?.seeCoffeeShops}
        keyExtractor={(shop) => "" + shop.id}
        renderItem={renderShop}
      />
    </ScreenLayout>
  );
}
