import { Button, Center, Checkbox, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, Input, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


interface BasicData {
    registrationNumber: string
    isRegistrationNumberValid: boolean
    peselNumber: string
    isPeselNumberValid: boolean
    privacyPolicyConsent: boolean
}

export const StartPage = () => {
    const navigation = useNavigate();

    const [basicData, setBasicData] = useState<BasicData>({
        registrationNumber: "",
        isRegistrationNumberValid: false,
        peselNumber: "",
        isPeselNumberValid: false,
        privacyPolicyConsent: false
    });

    const onRegistrationNumberChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBasicData({
            ...basicData,
            registrationNumber: event.currentTarget.value
        });
    };

    const onPeselNumberChanged = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setBasicData({
            ...basicData,
            peselNumber: event.currentTarget.value
        });
    };

    const onPrivacyPolicyConsentChanged = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setBasicData({
            ...basicData,
            privacyPolicyConsent: event.currentTarget.checked
        });
    };

    const isPeselNumberValid = () => {
        if (!basicData.peselNumber){
            return false;
        }
        return basicData.peselNumber.length === 11
    }

    const isRegistrationNumberValid = () => {
        if (!basicData.registrationNumber) {
            return false;
        }
        return basicData.registrationNumber.length <= 8
    }
    return (
        <Center bg='#ccc' h='100vh' flexDirection={"column"}>
            <Heading as="h2" size="lg">Ubezpiecz swój samochód</Heading>
            <Stack direction={"column"} bg="white" p={16}>
                <FormControl isInvalid={!!basicData.registrationNumber &&!isRegistrationNumberValid() }>
                    <FormLabel>Numer rejestracyjny</FormLabel>
                    <Input type='text' value={basicData.registrationNumber} onChange={onRegistrationNumberChanged} />
                    <FormErrorMessage>Numer rejestracyjny jest niepoprawny.</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!basicData.peselNumber &&!isPeselNumberValid() }>
                    <FormLabel>Numer Pesel wlasciciela pojazdu</FormLabel>
                    <Input type='text' value={basicData.peselNumber} onChange={onPeselNumberChanged} />
                    <FormErrorMessage>Numer pesel jest niepoprawny.</FormErrorMessage>
                </FormControl>
                <Checkbox 
                onChange={onPrivacyPolicyConsentChanged}
                isInvalid={!basicData.privacyPolicyConsent}
                >Akceptuje polityke prywatnosci
                </Checkbox>
                <Button 
                colorScheme='blue' 
                disabled={!isRegistrationNumberValid() || !isPeselNumberValid() || !basicData.privacyPolicyConsent }
                onClick={() => navigation('/details-form')}>Sprawdz cene</Button>
            </Stack>
        </Center>
    )
};