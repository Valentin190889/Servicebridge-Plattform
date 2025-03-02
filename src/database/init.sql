-- Create Database
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'ServiceBridgeDB')
BEGIN
    CREATE DATABASE ServiceBridgeDB;
END
GO

USE ServiceBridgeDB;
GO

-- Create Users table
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Users]') AND type in (N'U'))
BEGIN
    CREATE TABLE Users (
        UserId INT IDENTITY(1,1) PRIMARY KEY,
        Email NVARCHAR(255) NOT NULL UNIQUE,
        PasswordHash NVARCHAR(512) NOT NULL,
        CreatedAt DATETIME DEFAULT GETDATE(),
        LastLogin DATETIME,
        IsActive BIT DEFAULT 1
    );
END
GO

-- Create UserProfiles table
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[UserProfiles]') AND type in (N'U'))
BEGIN
    CREATE TABLE UserProfiles (
        ProfileId INT IDENTITY(1,1) PRIMARY KEY,
        UserId INT FOREIGN KEY REFERENCES Users(UserId),
        Position NVARCHAR(100) NOT NULL,
        Industry NVARCHAR(100) NOT NULL,
        Region NVARCHAR(100) NOT NULL,
        CompanyName NVARCHAR(255),
        CompanySize NVARCHAR(50),
        CreatedAt DATETIME DEFAULT GETDATE(),
        UpdatedAt DATETIME DEFAULT GETDATE()
    );
END
GO

-- Create Challenges table
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Challenges]') AND type in (N'U'))
BEGIN
    CREATE TABLE Challenges (
        ChallengeId INT IDENTITY(1,1) PRIMARY KEY,
        Industry NVARCHAR(100) NOT NULL,
        Position NVARCHAR(100) NOT NULL,
        Title NVARCHAR(255) NOT NULL,
        Description NVARCHAR(MAX) NOT NULL,
        Difficulty NVARCHAR(50),
        Category NVARCHAR(100),
        CreatedAt DATETIME DEFAULT GETDATE(),
        IsActive BIT DEFAULT 1
    );
END
GO

-- Create UserChallenges table
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[UserChallenges]') AND type in (N'U'))
BEGIN
    CREATE TABLE UserChallenges (
        UserChallengeId INT IDENTITY(1,1) PRIMARY KEY,
        UserId INT FOREIGN KEY REFERENCES Users(UserId),
        ChallengeId INT FOREIGN KEY REFERENCES Challenges(ChallengeId),
        Status NVARCHAR(50) DEFAULT 'Not Started',
        Progress INT DEFAULT 0,
        StartedAt DATETIME,
        CompletedAt DATETIME,
        Notes NVARCHAR(MAX)
    );
END
GO

-- Create ChatHistory table
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[ChatHistory]') AND type in (N'U'))
BEGIN
    CREATE TABLE ChatHistory (
        ChatId INT IDENTITY(1,1) PRIMARY KEY,
        UserId INT FOREIGN KEY REFERENCES Users(UserId),
        Message NVARCHAR(MAX) NOT NULL,
        Role NVARCHAR(50) NOT NULL,
        Type NVARCHAR(50) DEFAULT 'text',
        Timestamp DATETIME DEFAULT GETDATE()
    );
END
GO

-- Create ExpertConsultations table
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[ExpertConsultations]') AND type in (N'U'))
BEGIN
    CREATE TABLE ExpertConsultations (
        ConsultationId INT IDENTITY(1,1) PRIMARY KEY,
        UserId INT FOREIGN KEY REFERENCES Users(UserId),
        ExpertId INT,
        Topic NVARCHAR(255) NOT NULL,
        Description NVARCHAR(MAX) NOT NULL,
        Status NVARCHAR(50) DEFAULT 'Pending',
        CreatedAt DATETIME DEFAULT GETDATE(),
        UpdatedAt DATETIME DEFAULT GETDATE(),
        CompletedAt DATETIME
    );
END
GO

-- Insert some initial challenges data
IF NOT EXISTS (SELECT TOP 1 1 FROM Challenges)
BEGIN
    INSERT INTO Challenges (Industry, Position, Title, Description, Difficulty, Category)
    VALUES 
    ('technology', 'cto', 'Cybersecurity Implementation', 'Implement robust cybersecurity measures across the organization while maintaining operational efficiency', 'High', 'Security'),
    ('technology', 'cto', 'Digital Transformation', 'Lead the organization''s digital transformation initiatives and modernize legacy systems', 'High', 'Innovation'),
    ('finance', 'cfo', 'Risk Management', 'Develop comprehensive risk management strategies for volatile market conditions', 'High', 'Risk'),
    ('healthcare', 'ceo', 'Regulatory Compliance', 'Ensure compliance with evolving healthcare regulations while maintaining service quality', 'Medium', 'Compliance'),
    ('manufacturing', 'coo', 'Supply Chain Optimization', 'Optimize supply chain operations for better efficiency and cost management', 'High', 'Operations');
END
GO 