import { gql, useMutation } from "@apollo/client";
import { ReactNativeFile } from "apollo-upload-client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { colors } from "../colors";
import DismissKeyboard from "../components/DismissKeyboard";

const CREATE_COFFEESHOP_MUTATION = gql`
  mutation createCoffeeShop($name: String!, $category: String) {
    createCoffeeShop(name: $name, category: $category) {
      id
      name
      categories {
        id
        name
      }
    }
  }
`;

const Container = styled.View`
  flex: 1;
  background-color: black;
  padding: 0px 50px;
`;
const Photo = styled.Image`
  height: 350px;
`;
const CaptionContainer = styled.View`
  margin-top: 30px;
`;
const Caption = styled.TextInput`
  background-color: white;
  color: black;
  padding: 10px 20px;
  border-radius: 100px;
  margin-bottom: 10px;
`;

const HeaderRightText = styled.Text`
  color: ${colors.green};
  font-size: 16px;
  font-weight: 600;
  margin-right: 7px;
`;

export default function UploadForm({ route, navigation }) {
  const createCoffeeshop = (cache, result) => {
    const {
      data: { createCoffeeShop },
    } = result;
    if (createCoffeeShop.id) {
      cache.modify({
        id: "ROOT_QUERY",
        fields: {
          seeCoffeeshops(prev) {
            return [createCoffeeShop, ...prev];
          },
        },
      });
      navigation.navigate("Tabs");
    }
  };
  const [createCoffeeshopMutation, { loading }] = useMutation(
    CREATE_COFFEESHOP_MUTATION,
    {
      update: createCoffeeshop,
    }
  );
  const HeaderRight = () => (
    <TouchableOpacity onPress={handleSubmit(onValid)}>
      <HeaderRightText>Next</HeaderRightText>
    </TouchableOpacity>
  );
  const HeaderRightLoading = () => (
    <ActivityIndicator size="small" color="white" style={{ marginRight: 10 }} />
  );
  const { register, handleSubmit, setValue } = useForm();
  useEffect(() => {
    register("name", { required: true });
    register("category");
  }, [register]);
  useEffect(() => {
    navigation.setOptions({
      headerRight: loading ? HeaderRightLoading : HeaderRight,
      ...(loading && { headerLeft: () => null }),
    });
  }, [loading]);
  const onValid = ({ name, category }) => {
    const photos = new ReactNativeFile({
      uri: route.params.file,
      name: `1.jpg`,
      type: "image/jpeg",
    });
    createCoffeeshopMutation({
      variables: {
        name,
        category,
        photos,
      },
    });
  };
  return (
    <DismissKeyboard>
      <Container>
        <Photo resizeMode="contain" source={{ uri: route.params.file }} />
        <CaptionContainer>
          <Caption
            returnKeyType="done"
            placeholder="Write shop name"
            placeholderTextColor="rgba(0, 0, 0, 0.5)"
            onSubmitEditing={handleSubmit(onValid)}
            onChangeText={(text) => setValue("name", text)}
          />
          <Caption
            returnKeyType="done"
            placeholder="Write a category"
            placeholderTextColor="rgba(0, 0, 0, 0.5)"
            onSubmitEditing={handleSubmit(onValid)}
            onChangeText={(text) => setValue("category", text)}
          />
        </CaptionContainer>
      </Container>
    </DismissKeyboard>
  );
}
