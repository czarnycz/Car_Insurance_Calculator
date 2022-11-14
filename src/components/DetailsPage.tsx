import { FormControl, FormLabel, Heading, Input, Radio, RadioGroup, Select, Skeleton, Stack } from "@chakra-ui/react";
import { useCallback, useContext, useEffect, useState } from "react";
import { DataContext } from "../App";
import { Wrapper } from "./Wrapper";
import { format } from "date-fns";
import { PeselInput } from "./PeselInput";
import { UsageIntent } from "../models/UsageIntent";
import { DataApi } from "../Api/DataApi";
import { CustomVehicleUsage } from "../models/CustomVehicleUsage";

interface RequestStatus<T> {
    isLoaded: boolean;
    data: T;
}

export const DetailsPage = () => {
    const context = useContext(DataContext);

    const [requestVehicleUsage, setRequestVehicleUsage] = useState<RequestStatus<CustomVehicleUsage[]>>({
        isLoaded: false,
        data: [],
    });

    const onInsuranceStartDateChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        context.extendedDataModifier({
            ...context.extendedData,
            insuranceStartDate: event.currentTarget.valueAsDate || context.extendedData.insuranceStartDate,
        });
    };

    const fetchVehicleUsage = useCallback(async () => {
        try {

            setRequestVehicleUsage({ data: [], isLoaded: false });

            const usages = await DataApi.getVehicleUsage()

            await new Promise(resolve => setTimeout(resolve, 5000))

            setRequestVehicleUsage({ data: usages.data, isLoaded: true });
        } catch (error) {
            setRequestVehicleUsage({ data: [], isLoaded: false });
            console.error(error)
        }
    }, []);

    useEffect(() => {
        fetchVehicleUsage();
    }, []);

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
            <FormControl>
                <FormLabel>Sposob niestandardowego uzytkowania</FormLabel>
                <Skeleton isLoaded={!requestVehicleUsage.isLoaded}>
                    <Select placeholder='Wybierz sposób'>
                        {requestVehicleUsage.data.map(vehicleUsage => <option value={vehicleUsage.name}>{vehicleUsage.name}</option>)}
                    </Select>
                </Skeleton>

            </FormControl>
        </Wrapper>
    );
}; 