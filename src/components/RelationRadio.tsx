import { HStack, Radio, RadioGroup } from "@chakra-ui/react";

type Props = {
  radioValue: string;
  setRadioValue: React.Dispatch<React.SetStateAction<string>>
}

const RelationRadio = ( {radioValue, setRadioValue}: Props ) => {

  const handleRadioChange = (value: string) => {
    setRadioValue(value);
  };

  return (
    <RadioGroup value={radioValue} onChange={handleRadioChange}>
      <HStack gap="3">
        <Radio value="family">Family</Radio>
        <Radio value="friends">Friends</Radio>
        <Radio value="music">Music</Radio>
        <Radio value="other">other</Radio>
      </HStack>
    </RadioGroup>
  );
};

export default RelationRadio;
