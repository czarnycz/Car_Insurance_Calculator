import { FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react"
import { useContext } from "react";
import { DataContext } from "../App";
import { isPeselNumberValid } from "../utils/validators";

export const PeselInput = () => {

    const context = useContext(DataContext);


    const onPeselNumberChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        context.basicDataModifier({
            ...context.basicData,
            peselNumber: event.currentTarget.value
        });
    };

    return <FormControl isInvalid={!!context.basicData.peselNumber && !isPeselNumberValid(context.basicData.peselNumber)}>
        <FormLabel>Numer Pesel wlasciciela pojazdu</FormLabel>
        <Input type='text' value={context.basicData.peselNumber} onChange={onPeselNumberChanged} />
        <FormErrorMessage>Numer pesel jest niepoprawny.</FormErrorMessage>
    </FormControl>
}