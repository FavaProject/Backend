-- CreateTable
CREATE TABLE "Activity" (
    "id" SERIAL NOT NULL,
    "userID" INTEGER NOT NULL,
    "contentID" INTEGER NOT NULL,
    "typeTitle" TEXT NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityType" (
    "title" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Author" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Content" (
    "id" SERIAL NOT NULL,
    "typeTitle" TEXT NOT NULL,
    "genreTitle" TEXT NOT NULL,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContentGenre" (
    "title" TEXT NOT NULL,
    "typeTitle" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ContentParam" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "typeTitle" TEXT NOT NULL,
    "rateId" INTEGER NOT NULL,

    CONSTRAINT "ContentParam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContentType" (
    "title" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Rate" (
    "id" SERIAL NOT NULL,
    "userID" INTEGER NOT NULL,
    "contentID" INTEGER NOT NULL,
    "review" TEXT NOT NULL,

    CONSTRAINT "Rate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "secondName" TEXT NOT NULL,
    "nickName" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCollection" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UserCollection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserWishList" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UserWishList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AuthorToContent" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ContentToUserCollection" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ContentToUserWishList" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ActivityType_title_key" ON "ActivityType"("title");

-- CreateIndex
CREATE UNIQUE INDEX "ContentGenre_title_key" ON "ContentGenre"("title");

-- CreateIndex
CREATE UNIQUE INDEX "ContentType_title_key" ON "ContentType"("title");

-- CreateIndex
CREATE UNIQUE INDEX "UserCollection_userId_key" ON "UserCollection"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserWishList_userId_key" ON "UserWishList"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_AuthorToContent_AB_unique" ON "_AuthorToContent"("A", "B");

-- CreateIndex
CREATE INDEX "_AuthorToContent_B_index" ON "_AuthorToContent"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ContentToUserCollection_AB_unique" ON "_ContentToUserCollection"("A", "B");

-- CreateIndex
CREATE INDEX "_ContentToUserCollection_B_index" ON "_ContentToUserCollection"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ContentToUserWishList_AB_unique" ON "_ContentToUserWishList"("A", "B");

-- CreateIndex
CREATE INDEX "_ContentToUserWishList_B_index" ON "_ContentToUserWishList"("B");

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_contentID_fkey" FOREIGN KEY ("contentID") REFERENCES "Content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_typeTitle_fkey" FOREIGN KEY ("typeTitle") REFERENCES "ActivityType"("title") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_typeTitle_fkey" FOREIGN KEY ("typeTitle") REFERENCES "ContentType"("title") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_genreTitle_fkey" FOREIGN KEY ("genreTitle") REFERENCES "ContentGenre"("title") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentGenre" ADD CONSTRAINT "ContentGenre_typeTitle_fkey" FOREIGN KEY ("typeTitle") REFERENCES "ContentType"("title") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentParam" ADD CONSTRAINT "ContentParam_typeTitle_fkey" FOREIGN KEY ("typeTitle") REFERENCES "ContentType"("title") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentParam" ADD CONSTRAINT "ContentParam_rateId_fkey" FOREIGN KEY ("rateId") REFERENCES "Rate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rate" ADD CONSTRAINT "Rate_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rate" ADD CONSTRAINT "Rate_contentID_fkey" FOREIGN KEY ("contentID") REFERENCES "Content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCollection" ADD CONSTRAINT "UserCollection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserWishList" ADD CONSTRAINT "UserWishList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AuthorToContent" ADD CONSTRAINT "_AuthorToContent_A_fkey" FOREIGN KEY ("A") REFERENCES "Author"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AuthorToContent" ADD CONSTRAINT "_AuthorToContent_B_fkey" FOREIGN KEY ("B") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContentToUserCollection" ADD CONSTRAINT "_ContentToUserCollection_A_fkey" FOREIGN KEY ("A") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContentToUserCollection" ADD CONSTRAINT "_ContentToUserCollection_B_fkey" FOREIGN KEY ("B") REFERENCES "UserCollection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContentToUserWishList" ADD CONSTRAINT "_ContentToUserWishList_A_fkey" FOREIGN KEY ("A") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContentToUserWishList" ADD CONSTRAINT "_ContentToUserWishList_B_fkey" FOREIGN KEY ("B") REFERENCES "UserWishList"("id") ON DELETE CASCADE ON UPDATE CASCADE;
