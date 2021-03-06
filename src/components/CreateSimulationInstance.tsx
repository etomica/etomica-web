import * as React from "react";
import {Intent, NonIdealState, Spinner} from "@blueprintjs/core";
import {Redirect} from "react-router";
import {createSimulationInstance} from "../api/SimulationModel";
import {simulationStore} from "../stores/SimulationStore";
import {observer} from "mobx-react";

@observer
export class CreateSimulationInstance extends React.Component<any, any> {
    private simClassName: any;

    constructor(props: any) {
        super(props);
        const {match} = this.props;
        this.simClassName = match.params.simClassName;
        this.state = {
            loading: true,
        };
    }

    public componentDidMount() {
        createSimulationInstance(this.simClassName).then((response) => {
            console.log(response.data);
            this.setState({
                loading: false,
                simId: response.data,
            });
        });
    }

    public render() {
        if (simulationStore.isCreating) {
            return (
                <NonIdealState
                    title={"Creating Simulation..."}
                    className={"create-instance-container"}
                    visual={<Spinner className="pt-large" intent={Intent.PRIMARY}/>}
                />
            );
        } else {
            return (
                <Redirect to={`/view/${this.state.simId}`}/>
            );

        }
    }

}
