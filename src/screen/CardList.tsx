import { ScrollView } from "react-native";
import type { CardInput, CardResToken, CardListScreenProps } from "../types";
import NoCards from "../component/NoCards";
import Card from "../component/Card";
import RootView from "../component/RootView";
import { useAppSelector } from "../store/hooks";
import { RootState } from "../store";

export default function CardList({
  navigation,
}: CardListScreenProps): JSX.Element {
  const cardList = useAppSelector((state: RootState) => state.cardList.value);

  return (
    <RootView>
      {cardList.length == 0 ? (
        <NoCards navigation={navigation} />
      ) : (
        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 2 }}>
          {cardList.map((card: CardResToken) => (
            <Card key={card.id} data={card} />
          ))}
        </ScrollView>
      )}
    </RootView>
  );
}
