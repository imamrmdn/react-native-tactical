//
export const getVideo = (video) => {
    switch (video) {
        case "wallpass1":
            return require("../../assets/videos/wallpass/wallpass1.mp4")
        case "wallpass2":
            return require("../../assets/videos/wallpass/wallpass2.mp4")
        case "wallpass3":
            return require("../../assets/videos/wallpass/wallpass3.mp4")
        case "wallpass4":
            return require("../../assets/videos/wallpass/wallpass4.mp4")
        case "wallpass5":
            return require("../../assets/videos/wallpass/wallpass5.mp4")
        case "troughpass1":
            return require("../../assets/videos/troughpass/troughpass1.mp4")
        case "troughpass2":
            return require("../../assets/videos/troughpass/troughpass2.mp4")
        case "troughpass3":
            return require("../../assets/videos/troughpass/troughpass3.mp4")
        case "troughpass4":
            return require("../../assets/videos/troughpass/troughpass4.mp4")
        case "troughpass5":
            return require("../../assets/videos/troughpass/troughpass5.mp4")
        case "paralel1":
            return require("../../assets/videos/paralel/pararel1.mp4")
        case "paralel2":
            return require("../../assets/videos/paralel/pararel2.mp4")
        case "paralel3":
            return require("../../assets/videos/paralel/pararel3.mp4")
        case "paralel4":
            return require("../../assets/videos/paralel/pararel4.mp4")
        case "paralel5":
            return require("../../assets/videos/paralel/pararel5.mp4")
    }
}