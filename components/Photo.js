import React from "react";
import styled from "styled-components/native";

const Container = styled.View``;
const Header = styled.TouchableOpacity`
  padding: 10px;
  flex-direction: row;
  align-items: center;
`;
const ShopName = styled.Text`
  color: white;
  font-weight: 600;
`;

const Category = styled.View`
  flex-direction: row;
`;
const CategoryText = styled.Text`
  color: white;
  margin-left: 5px;
`;

function Photo({ id, name, categories }) {
  return (
    <Container>
      <Header>
        <ShopName>{name}</ShopName>
      </Header>
      <Category>
        <CategoryText>Category:</CategoryText>
        <CategoryText>
          {categories?.map((category) => (
            <CategoryText key={category.id}>{category.name}</CategoryText>
          ))}
        </CategoryText>
      </Category>
    </Container>
  );
}

export default Photo;
