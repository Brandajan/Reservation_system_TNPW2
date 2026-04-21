//IR02 centrální zpracování akcí - Jan Branda
import { getState, setState } from "./State.js";

export const dispatch = (action) => {
    const currentState = getState();
    
    switch (action.type) {
        //akce pro entitu RentalUnit
        case "PUBLISH_UNIT" : {
            //zde později volání business logiky pro kontrolu

            //zatím simulace změny pro tonyho
            const newUnits = currentState.rentalUnits.map(unit => unit.id ===action.payload.unitID ? {
                ...unit, status: "ACTIVE"
            } : unit);
            setState({rentalUnits: newUnits});
            break;
        }
        //akce pro IR03 - Async (tony)
        case "API_CALL_START" : {
            //načítací kolečko
            setState({ui: {...currentState.ui, isLoading: true, error: null}});
            break;
        }
        case "API_CALL_SUCCESS": {
            //data stažena - tony v payloadu posílá stažená ubytka
            setState({
                rentalUnits: action.payload.units,
                ui: {...currentState.ui, isLoading: false}
            });
            break;
        }
        case "NAVIGATE" : {
            setState({
                navigation: {
                    currentRoute: action.payload.route,
                    activeId: action.payload.activeId
                }
            });
            break;
        }
        case 'AUTH_LOGIN_SUCCESS': {
            setState({ auth: { ...currentState.auth, user: action.payload.user } });
            break;
    }

        case 'AUTH_LOGOUT': {
            setState({ auth: { ...currentState.auth, user: null } });
            break;
    }
        //zde přidávat další akce
        default:
            console.warn(`Neznámá akce: ${action.type}`);
    }
}