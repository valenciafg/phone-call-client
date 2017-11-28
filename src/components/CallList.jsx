import React,{Component} from 'react'
import CallsTable from './layout/CallsTable'

export default class CallList extends Component{
    constructor(...args){
        super(...args)
        this.options = {
            clearSearch: true,
            defaultSortName: 'callDateUnix',
            defaultSortOrder: 'desc',
            sizePerPageList: [
                {text: '10', value: 10},
                {text: '15', value: 15},
                {text: '20', value: 20},
                {text: '30', value: 30},
                {text: '40', value: 40},
                {text: '50', value: 50},
            ],
            sizePerPage: 15,
        }
    }
    createIndexedList(){
        let calls = this.props.calls.calls
        return(
            calls.map((data,i)=>{
                // console.log('mi dato',data)
                let duration = new Date(data.call.callDuration).getTime()
                let callData = {
                    id: i,
                    ext:data.call.ext,
                    dialedPhone: data.call.dialedPhone,
                    dialedPhoneName: data.call.dialedPhoneName,
                    callTime: data.call.callTime,
                    callDuration: data.call.callDuration,
                    callDate: data.call.callDate,
                    callDateUnix: data.call.callDateUnix
                }
                return(callData)
            })
        )
    }
    render(){
        let calls = this.props.calls.calls;
        if(calls !== undefined && calls.length > 0) {
            let indexedCalls = this.createIndexedList();
            return (
                <div>
                    <CallsTable calls={indexedCalls} options={this.options}/>
                </div>
            )
        }
        return(
            <h3>No Calls Received</h3>
        )
    }
}
