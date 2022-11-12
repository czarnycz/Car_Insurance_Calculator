import { FormControl, FormLabel, Heading, Input, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { useContext } from "react";
import { DataContext } from "../App";
import { Wrapper } from "./Wrapper";
import { format } from "date-fns";
import { PeselInput } from "./PeselInput";
import { UsageIntent } from "../models/UsageIntent";

export const DetailsPage = () => {
    const context = useContext(DataContext);

    const onInsuranceStartDateChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        context.extendedDataModifier({
            ...context.extendedData,
            insuranceStartDate: event.currentTarget.valueAsDate || context.extendedData.insuranceStartDate,
        });
    };

    const onNameChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        context.basicDataModifier({
            ...context.basicData,
            name: event.currentTarget.value
        });
    };

    const onLastNameChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        context.basicDataModifier({
            ...context.basicData,
            lastName: event.currentTarget.value
        });
    };

    return (
        <Wrapper>
            <Heading as="h2" size="lg">
                Dane ubezpieczającego
            </Heading>
            <FormControl>
                <FormLabel>Imię</FormLabel>
                <Input
                    type='text'
                    onChange={onNameChanged}
                />
            </FormControl>
            <FormControl>
                <FormLabel>Nazwisko</FormLabel>
                <Input
                    type='text'
                    onChange={onLastNameChanged}
                />
            </FormControl>
            <PeselInput />
            <FormControl>
                <FormLabel>Data rozpoczęcia ubezpieczenia</FormLabel>
                <Input
                    type='date'
                    placeholder="Wybierz date"
                    min={format(new Date(), "yyyy-MM-dd")}
                    onChange={onInsuranceStartDateChanged}
                />
            </FormControl>
            <Heading as="h2" size="lg">
                Dane Pojazdu
            </Heading>
            <FormControl>
                <FormLabel>Sposób użytkowania pojazdu</FormLabel>
                <RadioGroup defaultValue={context.extendedData.usageIntent} onChange={(newValue: UsageIntent) => {
                    context.extendedDataModifier({
                        ...context.extendedData,
                        usageIntent: newValue,
                    });
                }}>
                    <Stack spacing={5} direction='row'>
                        <Radio colorScheme='blue' value={UsageIntent.Private}>
                            Prywatny
                        </Radio>
                        <Radio colorScheme='blue' value={UsageIntent.Custom}>
                            Niestandardowy
                        </Radio>
                    </Stack>
                </RadioGroup>
            </FormControl>
        </Wrapper>
    );
}; 