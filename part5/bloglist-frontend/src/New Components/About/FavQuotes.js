import {List} from "semantic-ui-react";
import React from "react";

const FavQuotes = () => {

    return(
        <List divided relaxed>
            <List.Item>Jon Skeet doesn’t use `#include`. He thinks of it as cheating.</List.Item>
            <List.Item>When Jon Skeet’s code fails to compile, the compiler apologizes.</List.Item>
            <List.Item>Jon Skeet does not use revision control software. None of his code has ever needed revision.</List.Item>
            <List.Item>When you search for “guru” on Google it says “Did you mean Jon Skeet?”</List.Item>
            <List.Item>Drivers think twice before they dare interrupt Jon’s code.</List.Item>
            <List.Item>Users don’t mark Jon Skeet’s answers as accepted. The universe accepts them out of a sense of truth and justice.</List.Item>
        </List>
    )
};

export default FavQuotes;