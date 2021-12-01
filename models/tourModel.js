const mongoose = require('mongoose');
const slugify=require('slugify');

const tourSchema=new mongoose.Schema({
    name:{
      type:String,
      required:[true,'A tour must have a name'],
      trim:true,
      unique:true,
      maxlength:[40,'A tour must have less or equal then 40 characters'],
      minlength:[10,'A tour must have greater or equal then 40 characters'],
    },
    slug:String,
    duration:{
      type:Number,
      required:[true,'A tour have a duration']
    },
    maxGroupSize:{
      type:Number,
      required:[true,'A tour must have a group size']
    },
    difficulty:{
      type:String,
      required:[true,'A tour must have a difficulty'],
      enum:{
        values:['easy','medium','difficult'],
        message:'difficulty must be easy or medium or difficult'
      }
    },
    ratingAverage:{
      type:Number,
      default:4.5,
      min:[1,'A tour must have a rating greater or equal then 1'],
      max:[5,'A tour must have a rating lesser or equal then 5'],
    },
    ratingsQuantity:{
      type:Number,
      default:0
    },
    price:{
      type:Number,
      required:[true,'A tour must have price']
    },
    priceDiscount:{
      type:Number,
      validate:{
        validator:function(val){
          return val<this.price;
        },
        message:'Discount price {{VALUE}} should below regular price'
      }
    },
    summary:{
      type:String,
      trim:true,
      required:[true,'A tour must have a description']
    },
    description:{
      type:String,
      trim:true
    },
    imageCover:{
      type:String,
      required:[true,'A tour must have a cover image']
    },
    images:[String],
    createdAt:{
      type:Date,
      default:Date.now()
    },
    startDates:[Date],
    secretTour:{
      type:Boolean,
      default:false
    }
  },{
    toJSON:{virtuals:true},
    toObject:{virtuals:true},
  });

tourSchema.virtual('durationWeek').get(function(){
  return this.duration / 7;
});

tourSchema.pre('save',function(next){
  this.slug=slugify(this.name,{lower:true});
  next();
});
tourSchema.pre('save',function(next){
  console.log('will save document');
  next();
})
tourSchema.post('save',function(doc,next){
  console.log(doc);
  next(); 
});

tourSchema.pre(/^find/,function(next){
  this.find(
    {
      secretTour:{
        $ne:true
      }
    }
  );
  next();
});
tourSchema.pre('aggregate',function(next){
  this.pipeline().unshift({
    $match:{
      secretTour:{
        $ne:true
      }
    }
  });
  console.log(this.pipeline());
  next();
})

  
  const Tour=mongoose.model('Tour',tourSchema);
  module.exports=Tour;