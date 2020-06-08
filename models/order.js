import  moment from 'moment'

export default class Order{
    constructor(
        id,
        items,
        totalSum,
        date
    ){
        this.id = id
        this.items = items
        this.totalSum = totalSum
        this._date = date
    }

    set date(dt){
        this._date = dt
    }

    get date(){
        // return this._date.toLocaleDateString('en-EN',{
        //     year: 'numeric',
        //     month: 'long',
        //     day: 'numeric',
        //     hour: '2-digit',
        //     minute: '2-digit'
        // })
        return moment(this._date).format('MMMMM Do YYYY, hh:mm')
    }
}