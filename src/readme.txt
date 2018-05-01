  SELECT P.ProductNumber Code, P.Name Decsription, C.ProductCategoryID CategoryCode,
  SC.ProductSubcategoryID SubCategoryCode, P.ListPrice Price, 'Active' Status,
  PP.ThumbNailPhoto thumnail, PP.ThumbnailPhotoFileName thumnailName,
  PP.LargePhoto largePhoto, PP.LargePhotoFileName largePhotoName
    FROM Production.Product P
  INNER JOIN [Production].[ProductSubcategory] SC ON SC.ProductSubcategoryID = P.ProductSubcategoryID
  INNER JOIN [Production].[ProductCategory] C ON SC.ProductCategoryID = C.ProductCategoryID
  INNER JOIN Production.ProductProductPhoto PPP ON PPP.ProductID = P.ProductID
  INNER JOIN Production.ProductPhoto PP ON PP.ProductPhotoID = PPP.ProductPhotoID