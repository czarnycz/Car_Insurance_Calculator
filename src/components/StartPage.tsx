import { Button, Center, Checkbox, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, Input, Stack } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../App";
import { isPeselNumberValid } from "../utils/validators";
import { PeselInput } from "./PeselInput";
import { Wrapper } from "./Wrapper";





export const StartPage = () => {
    const navigation = useNavigate();

    const context = useContext(DataContext);

    const onRegistrationNumberChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        context.basicDataModifier({
            ...context.basicData,
            registrationNumber: event.currentTarget.value
        });
    };

    const onPrivacyPolicyConsentChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        context.basicDataModifier({
            ...context.basicData,
            privacyPolicyConsent: event.currentTarget.checked
        });
    };

    const isRegistrationNumberValid = () => {
        if (!context.basicData.registrationNumber) {
            return false;
        }
        return context.basicData.registrationNumber.length <= 8
    }
    return (
        <Wrapper heading="Ubezpiecz swój samochód">
            <FormControl isInvalid={!!context.basicData.registrationNumber && !isRegistrationNumberValid()}>
                <FormLabel>Numer rejestracyjny</FormLabel>
                <Input type='text' value={context.basicData.registrationNumber} onChange={onRegistrationNumberChanged} />
                <FormErrorMessage>Numer rejestracyjny jest niepoprawny.</FormErrorMessage>
            </FormControl>
            <PeselInput/>
            <Checkbox
                onChange={onPrivacyPolicyConsentChanged}
                isInvalid={!context.basicData.privacyPolicyConsent}
            >Akceptuje polityke prywatnosci
            </Checkbox>
            <Button
                colorScheme='blue'
                disabled={!isRegistrationNumberValid() || !isPeselNumberValid(context.basicData.peselNumber) || !context.basicData.privacyPolicyConsent}
                onClick={() => navigation('/details-form')}>Sprawdz cene</Button>
        </Wrapper>
    );
};