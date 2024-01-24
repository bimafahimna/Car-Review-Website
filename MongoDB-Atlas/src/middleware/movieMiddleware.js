const movieBodyMiddleware = (req,res, next)=>{
  let {title, year} = req.body
  if (title !== undefined && year !== undefined){
    let yearNumberCheck = Number(year)

    if (isNaN(yearNumberCheck)){
      res.status(400).json({
        error: "sorry year must be number"
      })
      return
    }

    next()    
  }else{
    res.status(400).json({
      error: "title and year is required"
    })
  }
}

module.exports = {movieBodyMiddleware}