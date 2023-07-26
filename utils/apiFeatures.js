class APIFeatures{
    constructor(query,queryString){
        this.query = query;
        this.queryString = queryString;
    }

    filter(){
        const queryObject = {...this.queryString};
        const excludeFields = ["page","sort","limit","page","fields"];

        excludeFields.forEach(el => delete queryObject[el])

        let queryString = JSON.stringify(queryObject);
        queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, (match)=>{
            return `$${match}`
        } )

        const filter = JSON.parse(queryString);
        this.query.find(filter);
        return this;
    }

    sort(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(",").join(" ")
            this.query.sort(sortBy);
        }
        return this;
    }

    select(){
        if(this.queryString.fields){
            const fields = this.queryString.fields.split(",").join(" ")
            this.query.select(fields);
        }
        return this;
    }

    paginate(){
        const limit = this.queryString.limit * 1 || 10;
        const page  = this.queryString.page * 1 || 1;

        const skip = (page-1) * limit;

        this.query.skip(skip).limit(limit);

        return this;
    }
}

module.exports = APIFeatures;